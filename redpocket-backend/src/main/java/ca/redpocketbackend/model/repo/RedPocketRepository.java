package ca.redpocketbackend.model.repo;

import ca.redpocketbackend.model.RedPocket;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RedPocketRepository extends MongoRepository<RedPocket, String> {

}